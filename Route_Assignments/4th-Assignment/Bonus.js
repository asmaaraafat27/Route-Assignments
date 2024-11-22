/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
    let cnt = 0;
    let current = 1;
    let i = 0;
    while (cnt < k) 
    {
        if (i < arr.length && arr[i] === current) 
        {
            i++;
        } 
        else
        {
            cnt++;
            if (cnt === k) {
                return current;
            }
        }
        current++;
    }
};
