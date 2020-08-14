from django.db import models
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2, decode_predictions, preprocess_input
from django.utils import timezone

# Create your models here.
class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        uploaded = timezone.localtime(self.uploaded)
        return "Image classfied at {}".format(uploaded.strftime('%Y-%m-%d %H:%M'))

    def save(self, *args, **kwargs):
        try:
            
            img = load_img(self.picture, target_size=(299,299))
            img_array = img_to_array(img)
            to_predict = np.expand_dims(img_array, axis=0)
            preprossesing = preprocess_input(to_predict)
            model = InceptionResNetV2(weights='imagenet')
            prediction = model.predict(preprossesing)
            decode = decode_predictions(prediction)[0][0][1]
            self.classified = str(decode)
            print('success')
            
            
        except Exception as e:
             print("classification failed",e)
        super().save(*args, **kwargs)