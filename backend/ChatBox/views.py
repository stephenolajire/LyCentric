import openai
import os
from django.http import JsonResponse
from rest_framework.views import APIView
from decouple import config

class UploadFileView(APIView):
    def post(self, request):
        # Set your OpenAI API key
        openai.api_key = config('open_ai')  # Ensure this matches your .env file

        # Path to your .jsonl file
        file_path = os.path.join(os.path.dirname(__file__), '../data/data.jsonl')  # Adjust as needed

        # Check if the file exists
        if not os.path.exists(file_path):
            return JsonResponse({'error': 'File not found.'}, status=404)

        try:
            # Upload the file to OpenAI
            with open(file_path, 'rb') as jsonl_file:
                response_file_upload = openai.File.create(
                    file=jsonl_file,
                    purpose='fine-tune'
                )
            file_id = response_file_upload['id']
            print(f"File uploaded successfully. File ID: {file_id}")

            # Start fine-tuning
            fine_tune_response = openai.FineTune.create(
                training_file=file_id,
                model="gpt-3.5-turbo"  # Or "gpt-4" based on your requirements
            )

            fine_tune_id = fine_tune_response.get('id', 'Fine-tuning initiation failed.')

            return JsonResponse({'fine_tune_id': fine_tune_id})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
