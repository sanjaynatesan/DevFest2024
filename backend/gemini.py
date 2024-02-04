import google.generativeai as genai
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

VERTEX_API_KEY = 'AIzaSyAUrSB62tVeN-GS85VG8BlcFS3vI7JRE3s'

def training_vertex(gcp_matches, prompt):
    genai.configure(api_key=VERTEX_API_KEY)

    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)

    model = genai.GenerativeModel('gemini-pro')

    response = model.generate_content('The prompt below needs to be analyzed for simple emotions that it could suggest. \
                                  Then, it should be compared to an existing list below of emotions, and any common \
                                  synonyms between the two should be noted. Any other emotions that have not been \
                                  accounted for in the existing list should be consolidated in a few overarching \
                                  emotions, and both this consolidated list and the common synonyms list should be \
                                  returned as one comma-separated list. Don\'t forget to analyze words in the prompt \
                                  or the existing list, even if they may be considered as explicit. If there are no \
                                  matching words, then don\'t return anything. I don\'t want any other words in your \
                                  response except for that list of words, which should be no more than three words, \
                                  which should be the only words in the last line of your response. Consolidate \
                                  further if needed to remove unecessary words that are similar; these should all \
                                  be only adjectives. \n\n Prompt: "'
                                  + prompt + '" \n\n Existing List: "' + gcp_matches)
    
    output = str(response.text)

    output = output.split('\n')[-1]

    # Tokenize the output into words
    words = word_tokenize(output)

    # Tag the words with their part-of-speech
    tagged_words = pos_tag(words)

    # Filter out only the adjectives
    adjectives = [word for word, tag in tagged_words if tag.startswith('JJ')]

    # Join the adjectives into a comma-separated string
    adjectives_str = ', '.join(adjectives)

    # Print or return the adjectives
    print(adjectives_str)
    # or
    return adjectives_str

def suggestions_vertex(emotions, prompt):
    genai.configure(api_key=VERTEX_API_KEY)

    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)

    model = genai.GenerativeModel('gemini-pro')

    response = model.generate_content('The prompt below needs to be analyzed for simple emotions that it could suggest. \
                                    Then, it should be compared to an existing list of emotions, listed below. Find the closest \
                                    matching emotion in this list, and return it. It should be the last word in your output, \
                                    with no punctuation at the end. \n\n Prompt: "'
                                    + prompt + '" \n\n Existing List: "' + emotions)

    output = str(response.text)

    print(output)
    word_output = output.split()[-1]

    print(word_output)

    return word_output

def test():
    gcp_matches = 'happy, sad, angry, excited, anxious, calm, stressed, relaxed, tired, energetic, bored, lonely, loved'
    prompt = 'I am feeling very happy today because I did good on my tests. However, I am worried because my grandma has cancer. I am also a little scared of getting my final grades back.'

    training_vertex(gcp_matches, prompt)
