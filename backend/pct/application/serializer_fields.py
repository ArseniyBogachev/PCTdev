from rest_framework.serializers import Field


class BinaryField(Field):
    def to_representation(self, value):
        to_bytes = value.tobytes()
        return to_bytes.decode('utf-8')

    def to_internal_value(self, value):
        return value.encode('utf-8')