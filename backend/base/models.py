from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.conf import settings

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, username=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if username is None:
            raise ValueError('A username is required for superusers.')
        user = self.create_user(email, password, username=username)
        user.is_staff = True  # Make the user a staff member
        user.is_superuser = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)  # Add this field
    is_staff = models.BooleanField(default=False)   # Add this field

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.username
    
class Product(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field  
    # image =
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True) # max_digits=7 -> 9999.99
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True) # auto_now_add=True -> set the date automatically when the product is created
    id = models.AutoField(primary_key=True, editable=False) # editable=False -> the id cannot be changed

    def __str__(self):
        return self.name
    
class Review(models.Model): 
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True) 
    name = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field  
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False) # editable=False -> the id cannot be changed

    def __str__(self):
        return str(self.rating) # return a string representation of the rating  # str(self.rating) -> convert the rating to a string       
    
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False) # default=False -> the order is not paid by default
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True) # auto_now_add=False -> set the date automatically when the order is paid
    isDelivered = models.BooleanField(default=False) # default=False -> the order is not delivered by default
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True) # auto_now_add=False -> set the date automatically when the order is delivered
    createdAt = models.DateTimeField(auto_now_add=True) # auto_now_add=True -> set the date automatically when the order is created
    id = models.AutoField(primary_key=True, editable=False) # editable=False -> the id cannot be changed

    def __str__(self):
        return str(self.createdAt)
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    id = models.AutoField(primary_key=True, editable=False) # editable=False -> the id cannot be changed

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True) # OneToOneField -> one order has one shipping address
    address = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    city = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    postalCode = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    country = models.CharField(max_length=200, null=True, blank=True) # null=True, blank=True -> optional field
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False) # editable=False -> the id cannot be changed

    def __str__(self):
        return str(self.address)
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Cart for {self.user.username} ({self.created_at})"
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"CartItem: {self.product.name} ({self.quantity} units)"
    
    def get_total_price(self):
        return self.product.price * self.quantity