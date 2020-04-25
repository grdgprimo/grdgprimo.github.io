let characters = [];
let stories = [];
let active;

// Import text from file
function getFile(id)
{
    let filepath = id+".txt";
    active = id;
    $('.dropdown-menu').empty();
    $.get(filepath,function(txt)
    {
        var lines = txt.split("\n");
        if(active==="characters")
        {
            for (let index = 0; index < lines.length; index+=4) 
            {
                $('#charactersMenu').append(`<a class="dropdown-item" href="#">${lines[index]}</a><div class="dropdown-divider"></div>`);
                characters.push(createNewPerson(lines[index].trim(),lines[index+1].trim(),lines[index+2].trim(),lines[index+3]));
                
            }
        }
        else
        {
            for (let index = 0; index < lines.length; index+=3) 
            {
                $('#storyMenu').append(`<a class="dropdown-item" href="#">${lines[index]}</a><div class="dropdown-divider"></div>`);
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


// FillMenu
$(function()
{
    $('.nav-link.dropdown-toggle').click(function()
    {
        
        console.log(this.id);
        getFile(this.id);
    });
});

// Select menu item
$(document).on('click', '.dropdown-item', function(){
    $('.container').empty();
    let index = 0;
    /*$("button").attr('class', 'navbar-toggler collapsed');
    $("button").attr('aria-expanded', 'false');*/
    /*$("#navbarSupportedContent").attr('class', 'navbar-toggler collapsing');*/
    if(active === "characters")
    {
        while(characters[index].name.trim()!==$(this).text().trim())
        {
            index++;
        }
        $('.container').append(
            `
            <h1>${characters[index].name}</h1>
            <h3>${characters[index].title}</h3>
            <div class="imageContainer"></div>
            <p>${characters[index].story}</p>
            `
        )
        for(let i=0; i<characters[index].imageCount; i++)
        {
            $('.imageContainer').append(`<div class="imageHolder" title="${characters[index].name.trim()+i}" style="background-image:url("../images/${characters[index].name.trim()+i}.jpg")"></div>`);
            
        }
    }
    else
    {
        while(stories[index].name.trim()!==$(this).text().trim())
        {
            index++;
        }

        $('.container').append(`<h1>${stories[index].name}</h1>${stories[index].data} <div class="imageContainer"></div>`);
        for(let i=0; i<stories[index].imageCount; i++)
        {
            $('.imageContainer').append(`<div class="imageHolder" title="${stories[index].id.trim()+i}" style="background-image:url("../images/${stories[index].id.trim()+i}.jpg")"></div>`);
        }


    }
 });

//show big image
 $(document).on('click','.imageHolder', function()
 {
    $('.bigImageContainer').remove();
    $('.container').append(`<div class="bigImageContainer"><img src="images/${this.title}.jpg"></div>`)
 });