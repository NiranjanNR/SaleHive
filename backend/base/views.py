from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

# Create your views here.
@api_view(['GET'])
def getRoutes(requests):
    return Response("products")

@api_view(['GET'])
def getProducts(requests):
    return Response(products)

@api_view(['GET'])
def getProduct(requests,pk):
    product = None
    for i in products:
        if i["id"] == pk:
            product = i
            break
    return Response(product)