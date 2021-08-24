import stripe
from django.conf import settings
from cities_light.models import City
from .models import *
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate
from .serializer import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib import messages

User = get_user_model()

# Create your views here.

stripe.api_key = settings.STRIPE_SECRET_KEY


class LoginView(APIView):
    def post(self, request):
        phone_number = request.data['phone_number']
        password = request.data['password']
        # user_data = authenticate(phone_number=phone_number, password=password)
        user_data = User.objects.filter(
            phone_number=phone_number, password=password)
        if(user_data):
            data = User.objects.get(phone_number=phone_number)
            refresh = RefreshToken.for_user(data)
            data = {
                'message': 'login successfully',
                'refresh': str(refresh),
                'token': str(refresh.access_token),
                'id': data.id,
                'phone_number': data.phone_number,
                'user_name': data.username,
                # 'user_address': data.address,
            }
            # return JsonResponse(data)
            return Response(status=HTTP_200_OK, data=data)
        else:
            # print('user not found')
            error = {
                "error": "user not found"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)


class RegisterView(APIView):
    def post(self, request):
        email = request.data['email']
        user_name = request.data['user_name']
        phone_number = request.data['phone_number']
        password = request.data['password']
        confirm_password = request.data['confirm_password']

        user_data = User.objects.filter(phone_number=phone_number)
        if user_data:
            error = {
                "error": "user allready exist"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)
        else:
            user = User(username=user_name, password=password,
                        phone_number=phone_number, email=email)
            print(user)
            user.save()
            refresh = RefreshToken.for_user(user)
            msg = {
                "message": "register successfully",
                'refresh': str(refresh),
                'token': str(refresh.access_token),
            }
            return Response(status=HTTP_200_OK, data=msg)


class GetallproductView(APIView):
    def get(self, request):
        product_data = Product.objects.all().values()
        data = list(product_data)

        for ddata in range(len(data)):
            # print(data[ddata])
            if(data[ddata]['product_image'] == ''):
                data[ddata]['product_image'] = None
            else:
                # print(data[ddata]['image'])
                image_url = 'http://127.0.0.1:8000/media/' + \
                    (data[ddata]['product_image'])
                data[ddata]['product_image'] = image_url

        return Response(status=HTTP_200_OK, data=data)
        # return Response(status=HTTP_200_OK,data=data)


class ProductView(APIView):
    def post(self, request):
        product_id = request.data['id']
        product_data = Product.objects.filter(id=product_id).values()
        print(product_data)
        data = list(product_data)
        if product_data:
            for ddata in range(len(data)):
                if(data[ddata]['product_image'] == ''):
                    data[ddata]['product_image'] = None
                else:
                    image_url = 'http://127.0.0.1:8000/media/' + \
                        (data[ddata]['product_image'])
                    image_detail_url = 'http://127.0.0.1:8000/media/' + \
                        (data[ddata]['product_detail_image'])
                    data[ddata]['product_image'] = image_url
                    data[ddata]['product_detail_image'] = image_detail_url
            return Response(status=HTTP_200_OK, data=data)
        else:
            error = {
                "error": "product not found"
            }
            return Response(status=HTTP_400_BAD_REQUEST, data=error)


class AddtocartView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        product_id = request.data['product_id']

        u_id = User.objects.get(id=user_id)
        p_id = Product.objects.get(id=product_id)

        check_data = CartItem.objects.filter(user=u_id, product=p_id).values()

        product_data = Product.objects.filter(id=product_id).values()
        product_price = int(product_data[0]['product_price'])
        # print(product_data)

        # print(check_data[0]['quantity'])
        # print(list(check_data))

        if check_data.exists():
            q_data = check_data[0]['quantity'] + 1
            # print(q_data)
            p_price = product_price * q_data
            print(p_price)
            update_data = CartItem.objects.filter(user=u_id, product=p_id).update(
                quantity=q_data, total_price=p_price)

            cart_data = CartItem.objects.filter(user=user_id).values()

            # product_data=Product.objects.filter(id=product_id).values()
            # print(cart_data)
            list_of_cart = list(cart_data)
            total_cart_price = 0
            # print(total_cart_price)
            for data in range(len(list_of_cart)):
                print(list_of_cart[data]['total_price'])
                total_cart_price = total_cart_price + \
                    list_of_cart[data]['total_price']
            # print(total_cart_price)
            data = {
                "msg": "update cart successfully",
                "cart_data": cart_data,
                "total_cart_price": total_cart_price
                # "product_data":product_data
            }
            return Response(status=HTTP_200_OK, data=data)

        else:
            addcart_data = CartItem.objects.create(
                user=u_id, ordered=False, product=p_id, total_price=product_price)
            addcart_data.save()
            cart_data = CartItem.objects.filter(user=user_id).values()
            list_of_cart = list(cart_data)
            total_cart_price = 0
            for data in range(len(list_of_cart)):
                print(list_of_cart[data]['total_price'])
                total_cart_price = total_cart_price + \
                    list_of_cart[data]['total_price']
            # product_data=Product.objects.filter(id=product_id).values()

            data = {
                "msg": "Add in cart successfully",
                "cart_data": cart_data,
                "total_cart_price": total_cart_price
                # "product_data":product_data
            }
            return Response(status=HTTP_200_OK, data=data)


class RemovetocartView(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        product_id = request.data['product_id']

        u_id = User.objects.get(id=user_id)
        p_id = Product.objects.get(id=product_id)

        check_data = CartItem.objects.filter(user=u_id, product=p_id).values()

        product_data = Product.objects.filter(id=product_id).values()
        product_price = int(product_data[0]['product_price'])

        if check_data.exists():
            q_data = check_data[0]['quantity'] - 1
            p_price = product_price * q_data
            # print(q_data)
            update_data = CartItem.objects.filter(user=u_id, product=p_id).update(
                quantity=q_data, total_price=p_price)

            cart_data = CartItem.objects.filter(user=user_id).values()
            list_of_cart = list(cart_data)
            total_cart_price = 0
            for data in range(len(list_of_cart)):
                print(list_of_cart[data]['total_price'])
                total_cart_price = total_cart_price + \
                    list_of_cart[data]['total_price']

            product_data = Product.objects.filter(id=product_id).values()

            data = {
                "msg": "update cart successfully",
                "cart_data": cart_data,
                "total_cart_price": total_cart_price

                # "product_data":product_data
            }
            return Response(status=HTTP_200_OK, data=data)


class UsercartlistView(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        u_id = User.objects.get(id=user_id)
        cart_data = CartItem.objects.filter(user=u_id).values()
        list_of_cart = list(cart_data)
        total_cart_price = 0
        for data in range(len(list_of_cart)):
            print(list_of_cart[data]['total_price'])
            total_cart_price = total_cart_price + \
                list_of_cart[data]['total_price']
        # print(cart_list)
        data = {
            "msg": "get cart successfully",
            "cart_data": cart_data,
            "total_cart_price": total_cart_price
            # "product_data":product_data
        }
        return Response(status=HTTP_200_OK, data=data)


class GetuserView(APIView):
    def post(self, request):
        data = User.objects.all().values()
        return Response(status=HTTP_200_OK, data=data)


class DeletecartitemView(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        cart_product_id = request.data['cart_product_id']

        data = CartItem.objects.get(id=cart_product_id, user=user_id)
        data.delete()
        print(data)
        cart_data = CartItem.objects.filter(user=user_id).values()
        list_of_cart = list(cart_data)
        total_cart_price = 0
        for data in range(len(list_of_cart)):
            print(list_of_cart[data]['total_price'])
            total_cart_price = total_cart_price + \
                list_of_cart[data]['total_price']
        data = {
            "msg": "get cart successfully",
            "cart_data": cart_data,
            "total_cart_price": total_cart_price
            # "product_data":product_data
        }
        return Response(status=HTTP_200_OK, data=data)


class CityView(APIView):
    def post(self, request):
        city_data = City.objects.all().values()
        data = list(city_data)
        return Response(status=HTTP_200_OK, data=data)


class AddressView(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        address = request.data['Address']
        pincode = request.data['pincode']
        country_id = request.data['country_id']

        u_id = User.objects.get(id=user_id)
        c_id = City.objects.get(id=country_id)
        address_data = Address.objects.create(
            user=u_id, address=address, pincode=pincode, city=c_id)
        address_data.save()
        data = {
            "msg": "address add successfully",
        }
        return Response(status=HTTP_200_OK, data=data)

    def get(self, request, id):
        # user_id = request.data['user_id']

        address_data = Address.objects.filter(user=id).values()
        city_id = address_data[0]['city_id']

        address_city = City.objects.filter(id=city_id).values()
        city_name = address_city[0]['display_name']
        print(city_name)
        data = {
            "msg": "address get successfully",
            "address": address_data,
            "city": city_name
        }

        if address_data.exists():
            return Response(status=HTTP_200_OK, data=data)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        address = request.data['address']
        pincode = request.data['pincode']
        country_id = request.data['countryid']
        u_id = User.objects.get(id=id)
        c_id = City.objects.get(id=country_id)

        card_data = Address.objects.filter(user=u_id).update(
            address=address, pincode=pincode, city=c_id)
        data = {
            "msg": "address update successfully",
        }
        return Response(status=HTTP_200_OK, data=data)


class PaymentView(APIView):
    def post(self, request):
        id = request.data['id']
        amount = request.data['amount'] 
        user = request.data['user']
        u_id = User.objects.get(id=user)
        try:
            charge = stripe.PaymentIntent.create(
                amount=amount*100,  # cents
                currency="INR",
                payment_method=id,
                confirm=True
            )
            print(charge)

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = id
            payment.user = u_id
            payment.amount = amount
            payment.save()

            # assign the payment to the order

            # order_item = order.items.all()
            # order_item.update(ordered=True)
            # for item in order_item:
            #     item.save()

            # order.ordered = True
            # order.payment = payment
            # order.ref_code = create_ref_code()
            # order.save()

            # messages.success(self.request, "Your order was successful!")
            # return redirect("/")
            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            messages.error(self.request, f"{err.get('message')}")
            return Response(status=HTTP_400_BAD_REQUEST, data='a')

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.error(self.request, "Rate limit error")
            return Response(status=HTTP_400_BAD_REQUEST, data='b')

        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            messages.error(self.request, "Invalid parameters")

            return Response(status=HTTP_400_BAD_REQUEST, data='c')

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            messages.error(self.request, "Not authenticated")
            return Response(status=HTTP_400_BAD_REQUEST, data='d')

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            messages.error(self.request, "Network error")
            return Response(status=HTTP_400_BAD_REQUEST, data='e')

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            messages.error(
                self.request, "Something went wrong. You were not charged. Please try again.")
            return Response(status=HTTP_400_BAD_REQUEST, data='f')

        except Exception as e:
            # send an email to ourselves
            messages.error(
                self.request, "A serious error occurred. We have been notifed.")
            return Response(status=HTTP_400_BAD_REQUEST, data='g')

        # data = {
        #     'id':id,
        #     'amount':amount,
        #     'user':user,
        # }
        # return Response(status=HTTP_200_OK, data=data)
