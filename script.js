let characters = [];
let stories = [];
let active;

// Import text from file
function getFile(id)
{
    let filepath = id+".txt";
    active = id;
    $.get(filepath,function(txt)
    {
        var lines = txt.split("\n");
        if(active==="characters")
        {
            for (let index = 0; index < lines.length; index+=4) 
            {
                $('#sideMenu').append(`<li>${lines[index]}</li>`);
                characters.push(createNewPerson(lines[index],lines[index+1],lines[index+2],lines[index+3]));
                
            }
        }
        else
        {
            for (let index = 0; index < lines.length; index+=2) 
            {
                $('#sideMenu').append(`<li>${lines[index]}</li>`);
                $.get(lines[index+1]+".html", function(data) {
                    stories.push(createNewStory(lines[index],data));
                 }, 'text');
            }
        }
        
    });
}

// Create character
function createNewPerson(name,title,story,images) 
{
    const obj = {};
    obj.name = name;
    obj.title = title;
    obj.story = story;
    obj.images = images;

    return obj;
}

// Create story
function createNewStory(name, data)
{
    const obj = {};
    obj.name = name;
    obj.data = data;

    return obj;
}


// Show menu
$(function()
{
    $('button').click(function()
    {
        $('#sideMenu li').remove();
        getFile(this.id);
        $('#sideMenu').css('width','400');
    });
});

// Select menu item
$(document).on('click', 'li', function(){
    $('.mainContent').empty();
    let index = 0;
    if(active === "characters")
    {
        while(characters[index].name.localeCompare($(this).text())!=true)
        {
            index++;
        }
        $('.mainContent').append(
            `
            <h1>${characters[index].name}</h1>
            <h3>${characters[index].title}</h3>
            <p>${characters[index].story}</p>
            `
        )
    }
    if(active === "story")
    {
        while(stories[index].name.localeCompare($(this).text())!=true)
        {
            index++;
        }

        $('.mainContent').append(`<h1>${stories[index].name}</h1>${stories[index].data}`);
    }
    

    $('#sideMenu li').remove();
    $('#sideMenu').css('width','0');

    

 });

 // Remove menu 
 $(document).on('click', '.mainContent', function(){
    $('#sideMenu li').remove();
    $('#sideMenu').css('width','0');
 });