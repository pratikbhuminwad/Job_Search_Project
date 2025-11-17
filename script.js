document.getElementById('form').addEventListener('submit',function(event){
    event.preventDefault();
    let query=document.getElementById('query').value ;
    let country= document.getElementById('country').value ;
    fetchJob(query,country);

})

const fetchJob = async(query,country)=> {
    const loadingpara=document.getElementById('loading');
    loadingpara.style.display="block";
    
    const displayBtn=document.getElementById('display-result');
    displayBtn.innerHTML="";

    let queryPara=query.trim()=== "" ? "" : query.trim();
    queryPara=queryPara.replace(/\s+/g,"%20");

    let countryPara=country.trim()=== "" ? "" : country.trim();
    countryPara=countryPara.replace(/\s+/g,"%20");

 const url = `https://jsearch.p.rapidapi.com/search?query=${queryPara}%20jobs%20in%20${countryPara}&page=1&num_pages=1&date_posted=all`;const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '590bd7fabfmshfad7c48d0efffedp103f49jsn2d1738f71cab',
		'x-rapidapi-host': 'jsearch.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    loadingpara.style.display="none";
    const jobs = result.data;
	console.log(result.data);

    let output = "";
    jobs.forEach((job) =>{
        output += `
        <div class="job-card">
        <img src="${job.employer_logo}" alt="">
                    <h3>${job.job_title}</h3>

                    <p><strong>Company:</strong>${job.employer_name}</p>

                    <p><strong>Location:</strong> 
                        ${job.job_city || "N/A"}, ${job.job_country || ""} 
                    </p>

                    <p><strong>Posted at :</strong>
                     ${job.job_posted_at}, 
                    </p> 

                    <p><strong>platform:</strong>${job.job_publisher} </p>
                    <br>

                    </p>
                        <a href="${job.job_apply_link}" target="_blank">Apply Here</a>
                    </p>
        </div>
        `
    })
            displayBtn.innerHTML = output;

} catch (error) {
	console.error(error);
}
}