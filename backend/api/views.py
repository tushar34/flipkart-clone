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
User = get_user_model()
# Create your views here.


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
                'user_address':data.address,
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
        user_id= request.data['user_id']
        cart_product_id=request.data['cart_product_id']

        data = CartItem.objects.get(id=cart_product_id,user=user_id)
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

