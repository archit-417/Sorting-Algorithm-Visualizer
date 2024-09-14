function Bubble()
{
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N^2)";
    document.getElementById("Time_Best").innerText="Ω(N)";

    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;
    let c1 = "#16423C";
    let c2 = "red";
    let c3 = "yellow";
    let c4 = "green";

    for(var i=0; i<array_size-1; i++){
        for(var j=0; j<array_size-i-1; j++){
            div_update(divs[j], div_sizes[j],c3);//Color update

            if(div_sizes[j] > div_sizes[j+1]){
                div_update(divs[j], div_sizes[j], c2);//Color update
                div_update(divs[j+1], div_sizes[j+1], c2);//Color update
                
                //Swap the elements
                var temp = div_sizes[j];
                div_sizes[j] = div_sizes[j+1];
                div_sizes[j+1] = temp;

                div_update(divs[j], div_sizes[j], c2);//Height update
                div_update(divs[j+1], div_sizes[j+1], c2);//Height update
            }
            div_update(divs[j], div_sizes[j], c1);//Color update
        }
        div_update(divs[j], div_sizes[j], c4);//Color update
    }
    div_update(divs[0], div_sizes[0], c4);//Color update

    enable_buttons();
}