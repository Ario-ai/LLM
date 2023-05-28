import streamlit as st
from streamlit_chat import message
import requests
import streamlit as st


def generate_response(prompt):
    url = "http://backend:8008/get_llm"
    # url = "http://3.90.123.35:8008/get_llm"
    x = requests.post(url, params={"query": prompt})
    text = x.json()[0]["generated_text"]
    return text

def generate_chat(prompt):
    url = "http://backend:8008/get_llm_chat"
    # url = "http://3.90.123.35:8008/get_llm_chat"
    x = requests.post(url, params={"query": prompt})
    text = x.json()
    return text

def generate_response_context(prompt, k=5):
    url = "http://backend:8008/get_llm_context"
    # url = "http://3.90.123.35:8008/get_llm_context"
    x = requests.post(url, params={"query": prompt, "k": k})
    print(x)
    text = x.json()
    return text

def generate_context(prompt, k=5):
    url = "http://backend:8008/get_vector_matching"
    # url = "http://3.90.123.35:8008/get_vector_matching"
    x = requests.post(url, params={"query": prompt, "k": k})
    text = x.json()
    return text

# st.set_page_config(layout="wide")
st.title(":robot_face: Semantic AI")

# Storing the chat
if "generated" not in st.session_state:
    st.session_state["generated"] = []

if "past" not in st.session_state:
    st.session_state["past"] = []


def get_text():
    input_text = st.text_input("Input: ", "", key="input")
    return input_text


tab1, tab2, tab3 = st.tabs(
    [
        ":robot_face: Chatbot",
        ":book: Question Answering",
        ":chart_with_upwards_trend: Summarization",
    ]
)

st.markdown(
    """
    <style>
        div[data-testid="column"]:nth-of-type(1)
        {
            text-align: end;
        } 
    </style>
    """,
    unsafe_allow_html=True,
)

with tab1:
    user_input = get_text()
    if user_input:
        output = generate_chat(user_input)
        # store the output
        st.session_state.past.append(user_input)
        st.session_state.generated.append(output)

    if st.session_state['generated']:
        for i in range(len(st.session_state['generated'])-1, -1, -1):
            message(st.session_state['past'][i], is_user=True, key=str(i) + '_user')
            message(st.session_state["generated"][i], key=str(i))
            
with tab2:
    txt = st.text_area('What is your question?', "")
    if txt:
        response = generate_response_context(txt)
        if "I don't know" in response:
            st.warning(response)
        else:
            st.success(response)
        
        context = generate_context(txt)
        with st.expander("See document source"):
            for i, doc in enumerate(context):
                st.write(doc)

with tab3:
    st.header("Coming Soon!")
