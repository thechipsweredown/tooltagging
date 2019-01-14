count = 1
while(count<100):
    with open('source/tag_'+str(count)+'.txt','r') as f :
        with open('source1/tag_'+str(count)+'.txt','w') as f1:
            for line in f :
                if(line.split(",")[0] != "" and "," in line):
                    arr = line.split(",")
                    f1.write(arr[0].rstrip())
                    f1.write("\n")
                    f1.write(",")
                    f1.write("\n")
                    f1.write(arr[1].rstrip())
                    f1.write("\n")
                else:
                    f1.write(line)
            count += 1            