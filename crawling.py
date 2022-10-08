from bs4 import BeautifulSoup
from urllib.request import urlopen

page = urlopen("https://ko.wikiquote.org/wiki/%ED%95%9C%EB%AC%B8_%EC%84%B1%EC%96%B4");
soup = BeautifulSoup( page, "html.parser");

proverbObj = {"Hanja":[], "Hangul":[], "Meaning":[]}
proverbFirst = []

for proverb in soup.find_all('td'):
    # remove last char \n
    proverbFirst.append(proverb.text[:-1])
    
for i in range(0, len(proverbFirst)):
    if i%3 == 0 : 
        proverbObj["Hanja"].append(proverbFirst[i])
    elif i%3 == 1 : 
        proverbObj["Hangul"].append(proverbFirst[i])
    else :
        proverbObj["Meaning"].append(proverbFirst[i])

f = open("C:/Users/user/Desktop/project/momentum/js/quotes-crawling.js", "w", encoding="utf-8")
f.write("quotes = [")
for i in range(0, len(proverbObj["Hanja"])) :
    f.write("{"+"Hanja : '" + proverbObj["Hanja"][i] + "', Hangul : '" + proverbObj["Hangul"][i] + "', Meaning : '" + proverbObj["Meaning"][i]+"'"+"},\n")
f.write("]")
f.close()