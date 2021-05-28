# number-padding-fix
A node program for fixing numbering of files and folders on your local computer.  

## Problem:       
- I had a course videos folder structure like this:
```  
    main-course-folder
    │    
    └─── 1. Folder1
    │     │─ 1. Video1   
    │     │─ 2. Video2 
    │     │─ ...  
    │     │─ 10. Video10
    │     └─ 20. Video20
    │
    │
    └─── ....
    │
    └─── 10. Folder10
    │     │─ 50. Video50 
    │     │─ ...  
    │     │─ 60. Video60
    │     └─ 61. Video61
    │
    └─── ....
    │
    └─── 20. Folder10
              │
              └─── 21. Folder21
                    │─ 100. Video100 
                    │─ ...  
                    │─ 110. Video110
                    └─ 120. Video120
``` 

- When put in a playlist these videos don't stay in order for some reason ( *which I think is because of zero padding* ). Here is how playlist looked when sorted:
```
    │─ 1. Video1
    │─ 10. Video10
    │─ 100. Video100
    │─ 101. Video101
    │─ ....
    │─ 11. Video11
    │─ 110. Video110
    └─ ....
```

- Which I don't think is the desired order I want to watch my videos in.

- After the script runs to completion, the result comes out to be like this (__*padding=3*__) :
    ```  
    main-course-folder
    │    
    └─── 001. Folder1
    │     │─ 001. Video1   
    │     │─ 002. Video2 
    │     │─ ...  
    │     │─ 010. Video10
    │     └─ 020. Video20
    │
    │
    └─── ....
    │
    └─── 010. Folder10
    │     │─ 050. Video50 
    │     │─ ...  
    │     │─ 060. Video60
    │     └─ 061. Video61
    │
    └─── ....
    │
    └─── 020. Folder10
              │
              └─── 021. Folder21
                    │─ 100. Video100 
                    │─ ...  
                    │─ 110. Video110
                    └─ 120. Video120
    ```

## Solution:
- __*Important: Script considers all the sub-directories of the given directory.*__  
- Requirements:   
  1. **Node.js**
  2. **Files and Folders with name: \<number\>\<delimiter\>\<filename\>**  
  - Examples:  
    **1. Course-Introduction.mp4**  = **1** - Number, '**.**' - Delimiter, '**Course-Introduction.mp4**' - Filename   
    **42# Directory-For-Everything**  = **42** - Number, '**#**' - Delimiter, '**Directory-For-Everything**' - Directory  
- How to run:
   - The script takes 3 command line arguments else assumes the default cases:  
        - `<directory-path>` : Which directory the script should fix the filenames and directory names in.  
            - `Default: Present working directory of the script`    
            
        - `<number-of-padding-places>` : How many places towards left should 0 be padded.  
            - For example: 4 will make 1 -> 0001 , 50 -> 0050, 100 -> 0100, 1000 -> 1000  
            - `Default: 3`    

        - `<delimiter>` : The character that separates the numbering from the filename.  
            - For example: For filename - **1# Introduction.mp4** the delimiter is **#**  
            - `Default: '.' (a period)`
   
   - Command: *Please include the single quotations*
   ```shell
    node script.js '<directory-path>' <number-of-padding-places> '<delimiter>'  
    ```
    or
    ```shell
    node script.js  
    ```
    Default arguments assumed in second case 🠕

- Usage examples:  
    `node script.js 'home/how-to-use-angular/course-videos' 4 '.'`  
    - **Directory to fix** - *'home/how-to-use-angular/course-videos'*  
    - **Padding places** - *4*
    - **Delimiter** - ` . ` *(a period)*  

    `node script.js 'home/projects/videos/how-to-use-node/course-videos' 2 '#'`  
    - **Directory to fix** - *'home/projects/videos/how-to-use-node/course-videos'*  
    - **Padding places** - *2*
    - **Delimiter** - ` # ` *(a pound sign)*  

    `node script.js`  
    - **Directory to fix** - Present working directory of the script.  
    - **Padding places** - *3*
    - **Delimiter** - ` . ` *(a period)*  
    