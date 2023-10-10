from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .products import products

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, CartItemSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from .models import Product, Cart, CartItem
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def getRoutes(request):
    products = Product.objects.all()
    data = list(products.values())
    return JsonResponse(data, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def getProducts(requests):
    products = Product.objects.all()
    data = list(products.values())
    return JsonResponse(data, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def getProduct(requests,pk):
    product = None
    for i in products:
        if i["id"] == pk:
            product = i
            break
    return Response(product)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    cart_items = CartItem.objects.filter(cart__user=user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, pk=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    cart_item.quantity += 1
    cart_item.save()
    return JsonResponse({'message': 'Item added to cart'}, status=200)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    cart_item_id = request.data.get('cart_item_id')
    cart_item = get_object_or_404(CartItem, pk=cart_item_id)
    cart_item.delete()
    return JsonResponse({'message': 'Item removed from cart'}, status=200)


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
	
