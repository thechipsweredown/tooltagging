import os, tempfile
from itertools import zip_longest

n = 14000
def grouper(n, iterable, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(fillvalue=fillvalue, *args)

def split():
    i = 1
    count = 1
    with open('source/tag.txt') as f:
        for line in f:
            with open('source/tag_'+str(i)+'.txt','a+') as f1:
                if(count >= n and line == "\n" ):
                    i += 1
                    count = 0
                else :
                    f1.write(line)
                    count += 1
split()