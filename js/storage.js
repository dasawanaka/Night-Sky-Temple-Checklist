function saveJsonData(key, data){
    var string = JSON.stringify(data);
    saveData(key, string);
}

function saveData(key, data){
    localStorage.setItem(key, data);
}

function loadJsonData(key){
    return JSON.parse(loadData(key)) || undefined;
}

function loadData(key){
    return localStorage.getItem(key);
}