# NovaAi

To Run Nova You need To Download Ollama

Then import:

* pip3 install pyttsx3
* pip3 install sounddevice
* pip3 install nltk
* pip3 install SpeechRecognition
* pip3 install langchain langchain-ollama



import pyttsx3
import ollama
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import sounddevice as sd
import numpy as np
import speech_recognition as sr
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
