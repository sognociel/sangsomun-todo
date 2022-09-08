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

f = open("C:/Users/user/Desktop/project/momentum/js/quotes-crawling.js", "w", encoding="utf-8")
f.write("quotes = [")
for i in range(0, len(proverbList["Hanja"])) :
    f.write("{"+"Hanja : '" + proverbList["Hanja"][i] + "', Hangul : '" + proverbList["Hangul"][i] + "', Meaning : '" + proverbList["Meaning"][i]+"'"+"},\n")
f.write("]")
f.close()