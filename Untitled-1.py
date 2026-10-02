class Solution:
    def buildArray(self, target: List[int], n: int) -> List[str]:

        stack = [] 
        stream = 1 

        for num in target: 
            while stream < num: 
                stack.append("Push")
                stack.append("Pop")
                stream += 1 

            stack.append("Push")
            stream += 1 

        return stack 
        