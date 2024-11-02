import math
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class FactoryPagination(PageNumberPagination):
    page_size = 14
    max_page_size = 14

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
            },
            'count': self.page.paginator.count,
            'results': data,
            'count_page': math.ceil(self.page.paginator.count / self.page_size)
        })