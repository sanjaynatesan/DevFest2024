import google.generativeai as genai

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

    return output

def test():
    gcp_matches = 'happy, sad, angry, excited, anxious, calm, stressed, relaxed, tired, energetic, bored, lonely, loved'
    prompt = 'I am feeling happy today'

    training_vertex(gcp_matches, prompt)
