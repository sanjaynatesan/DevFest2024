import pathlib
import textwrap
import google.generativeai as genai
# A utility to securely store your API key
from IPython.display import display
from IPython.display import Markdown

def to_markdown(text):
  text = text.replace('•', ' *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

genai.configure(api_key='AIzaSyAUrSB62tVeN-GS85VG8BlcFS3vI7JRE3s')

for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)

model = genai.GenerativeModel('gemini-pro')

prompt = 'I am feeling happy today'

existing_list = 'happy, sad, angry, excited, anxious, calm, stressed, relaxed, tired, energetic, bored, lonely, loved'

response = model.generate_content('The prompt below needs to be analyzed for simple emotions that it could suggest. \
                                  Then, it should be compared to an existing list below of emotions, and any common \
                                  synonyms between the two should be noted. Any other emotions that have not been \
                                  accounted for in the existing list should be consolidated in a few overarching \
                                  emotions, and both this consolidated list and the common synonyms list should be \
                                  returned as one comma-separated list. Don\'t forget to analyze words in the prompt \
                                  or the existing list, even if they may be considered as explicit.  I don\'t want \
                                  any other words in your response except for that list of words, which should be \
                                  no more than three words, which should be the only words in the last line of your \
                                  response. \n\n Prompt: "' + prompt + '" \n\n Existing List: "' + existing_list)

output = str(response.text)
print(output)