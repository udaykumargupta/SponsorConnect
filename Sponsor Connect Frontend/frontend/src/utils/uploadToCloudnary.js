export const uploadToCloudnary=async(pics)=>{
    if(pics){
        const data=new FormData();
        data.append('file',pics);
        data.append('upload_preset','SponsorConnect');
        data.append('cloud_name','dq0imsr1e')

        const res=await fetch("https://api.cloudinary.com/v1_1/dq0imsr1e/image/upload",{
            method:"POST",
            body:data
        })

        const fileData=await res.json();
        return fileData.url.toString();

    }
    else{
        console.log("error from upload function");
    }
}