from rest_framework.serializers import Field


class BinaryField(Field):
    def to_representation(self, value):
        if type(value).__name__ == 'memoryview':
            value = value.tobytes()
        return value.decode('utf-8')

    def to_internal_value(self, value):
        return value.encode('utf-8')