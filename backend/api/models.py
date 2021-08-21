from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django_countries.fields import CountryField
# Create your models here.


class User(AbstractUser):
    phone_number = models.CharField(max_length=20, unique=True)
    # username = models.CharField(max_length=50, null=True, blank=True,unique=False)
    # USERNAME_FIELD = "phone_number"

    def __str__(self):
        return self.username


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(max_length=100)
    pincode = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    country = CountryField(multiple=False)
    def __str__(self):
        return self.user.username


class Category(models.Model):
    category_name = models.CharField(max_length=50)

    def __str__(self):
        return self.category_name


class Sub_category(models.Model):
    sub_category_name = models.CharField(max_length=50)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.sub_category_name)

# class Specification(models.Model):
#     specification = models.JSONField(null=True)
    # def __str__(self):
    #     return self.id

# class Sub_category_specification(models.Model):
#     sub_category_id = models.ForeignKey(Sub_category,on_delete=models.CASCADE)
#     specification_id = models.ForeignKey(Specification,on_delete=models.CASCADE)
    # def __str__(self):
    #     return self.id


class Product(models.Model):
    product_name = models.CharField(max_length=50)
    product_price = models.CharField(max_length=50)
    product_image = models.ImageField(blank=True, null=True)
    product_detail_image = models.ImageField(blank=True, null=True)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_subcategory = models.ForeignKey(
        Sub_category, on_delete=models.CASCADE)
    product_specification = models.JSONField(null=True)

    def __str__(self):
        return self.product_name


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total_price = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.user)
