document.addEventListener('DOMContentLoaded', function() {
    fetchDomainList();
});

function fetchDomainList() {
    var request = new XMLHttpRequest();
    var url = "https://api.domainsdb.info/v1/domains/search?domain=facebook&zone=com";
    var proxy = "https://cors-anywhere.herokuapp.com/";
    url = proxy + url;

    request.open('GET', url, true);
    request.send();

    request.onload = function() {
        if (request.status == 200 && request.readyState == 4) {
            var data = JSON.parse(this.responseText);
            console.log("Domain data:", data.domains);
            insertDomains(data.domains);
        } else {
            alert("Failed to fetch domain list. Status: " + request.status);
            console.log("Failed to fetch domain list. Status:", request.status);
        }
    }

    request.onerror = function() {
        console.error("Connection failed");
        alert("Connection failed");
    }
}

function insertDomains(domains) {
    var select = document.getElementById('domain');
    select.innerHTML = ""; // Clear previous options

    domains.forEach(function(domain, index) {
        var option = document.createElement('option');
        option.value = index;
        option.textContent = domain.domain;
        select.appendChild(option);
    });
}
