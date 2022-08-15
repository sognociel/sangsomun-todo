from bs4 import BeautifulSoup
from urllib.request import urlopen

page = urlopen("https://ko.wikiquote.org/wiki/%ED%95%9C%EB%AC%B8_%EC%84%B1%EC%96%B4");
soup = BeautifulSoup( page, "html.parser");

proverbList = {"Hanja":[], "Hangul":[], "Meaning":[]}
proverbFirst = []

for proverb in soup.find_all('td'):
    # remove last char \n
    proverbFirst.append(proverb.text[:-1])
    
for i in range(0, len(proverbFirst)):
    if i%3 == 0 : 
        proverbList["Hanja"].append(proverbFirst[i])
    elif i%3 == 1 : 
        proverbList["Hangul"].append(proverbFirst[i])
    else :
        proverbList["Meaning"].append(proverbFirst[i])

# def quote():
#     return proverbList

# if __name__=="__main__":
#     print(quote())

for i in range(0, len(proverbList["Hanja"])) :
    print("{"+"Hanja : '" + proverbList["Hanja"][i] + "', Hangul : '" + proverbList["Hangul"][i] + "', Meaning : '" + proverbList["Meaning"][i]+"'"+"},")