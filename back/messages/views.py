from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import re
import json

@csrf_exempt
@require_http_methods(["POST"])
def create_message(request):
    my_messages = {}
    failed_messages = {}
    
    try:
        data = json.loads(request.body)
        my_messages['full_name'] = data.get("full_name", '').strip()
        my_messages['service'] = data.get("service", '').strip()
        my_messages['phone'] = data.get("phone", '').strip()
        my_messages['email'] = data.get("email", '').strip()
        my_messages['message'] = data.get("message", '').strip()

        required_fields = ['full_name', 'service', 'phone']
        for field in required_fields:
            if my_messages[field] == '':
                failed_messages[field] = f"Поле {field} обязательно для заполнения"
        
        if my_messages['email'] != '':
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, my_messages['email']):
                failed_messages['email'] = "Неверный формат email"
        
        if my_messages['phone'] != '':
            digits_only = re.sub(r'\D', '', my_messages['phone'])
            if len(digits_only) < 10:
                failed_messages['phone'] = "Телефон должен содержать минимум 10 цифр"
        
        if failed_messages:
            return JsonResponse({
                'ok': False,
                'errors': failed_messages
            }, status=400)

        body = f"Имя: {my_messages['full_name']}\nТелефон: {my_messages['phone']}\nEmail: {my_messages['email']}\nУслуга: {my_messages['service']}\n\nСообщение:\n{my_messages['message']}"
        
        send_mail(
            subject=f"Новое сообщение: {my_messages['service']}, от {my_messages['full_name']}, телефон {my_messages['phone']}",
            message=body,
            from_email=None,
            recipient_list=["emangasarian@sfedu.ru"],
            fail_silently=False,
        )
        
        return JsonResponse({
            'ok': True,
            'message': 'Сообщение успешно отправлено'
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'ok': False,
            'error': 'Неверный формат JSON'
        }, status=400)
        
    except Exception as e:
        return JsonResponse({
            'ok': False,
            'error': f'Ошибка сервера: {str(e)}'
        }, status=500)