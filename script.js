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
                characters.push(createNewPerson(lines[index].trim(),lines[index+1].trim(),lines[index+2].trim(),lines[index+3]));
                
            }
        }
        else
        {
            for (let index = 0; index < lines.length; index+=3) 
            {
                $('#sideMenu').append(`<li>${lines[index]}</li>`);
                $.get(lines[index+1]+".html", function(data) {
                    stories.push(createNewStory(lines[index],data,lines[index+1],lines[index+2]));
                 }, 'text');
            }
        }
        
    });
}

// Create character
function createNewPerson(name,title,story,imageCount) 
{
    const obj = {};
    obj.name = name;
    obj.title = title;
    obj.story = story;
    obj.imageCount = imageCount;

    return obj;
}

// Create story
function createNewStory(name, data, id, imageCount)
{
    const obj = {};
    obj.name = name;
    obj.data = data;
    obj.id=id;
    obj.imageCount = imageCount;

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
        while(characters[index].name.trim()!==$(this).text().trim())
        {
            index++;
        }
        $('.mainContent').append(
            `
            <h1>${characters[index].name}</h1>
            <h3>${characters[index].title}</h3>
            <div class="imageContainer"></div>
            <p>${characters[index].story}</p>
            `
        )
        for(let i=0; i<characters[index].imageCount; i++)
        {
            $('.imageContainer').append(`<div class="imageHolder"><img src="images/${characters[index].name.trim()+i}.jpg" class="image" title="${characters[index].name.trim()+i}"></div>`);
        }
    }
    else
    {
        while(stories[index].name.trim()!==$(this).text().trim())
        {
            index++;
        }

        $('.mainContent').append(`<h1>${stories[index].name}</h1>${stories[index].data} <div class="imageContainer"></div>`);
        for(let i=0; i<stories[index].imageCount; i++)
        {
            $('.imageContainer').append(`<div class="imageHolder"><img src="images/${stories[index].id.trim()+i}.jpg" class="image" title="${stories[index].id.trim()+i}"></div>`);
        }


    }
    
    $('#sideMenu li').remove();
    $('#sideMenu').css('width','0');

 });

 // Remove menu 
 $(document).on('click', '.mainContent', function(){
    $('#sideMenu li').remove();
    $('#sideMenu').css('width','0');
 });

 $(document).on('click','.image', function()
 {
    $('.bigImageContainer').remove();
    $('.mainContent').append(`<div class="bigImageContainer"><img src="images/${this.title}.jpg"></div>`)
 });