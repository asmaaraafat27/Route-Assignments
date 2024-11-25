/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let arr = {}, cnt=0;
    for(let i = 0; i<nums.length; i++)
    {
        if(!arr[nums[i]])
        {
            arr[nums[i]] =0;
        }
        arr[nums[i]]++;

        if(arr[nums[i]] > (nums.length/2))
        {
            return nums[i];
        }
    }
    
};