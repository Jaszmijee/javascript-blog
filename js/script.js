'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloudLink-link').innerHTML),
};

const optsClass = {
    tagSizes: {
        count: 5,
        classPrefix: 'tag-size-',
    },
};

const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list',
    authorsListSelector: '.authors.list',
};

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);


    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefValue = clickedElement.getAttribute('href');
    console.log('Clicked link href:', hrefValue);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(hrefValue);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('active Article:', targetArticle);
}

function generateTitleLinks(customSelector = '') {
    console.log('Function \'generateTitleLinks\'' + customSelector + '  is called');

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(opts.titleListSelector);
    console.log('list titles:', titleList);

    clearElement(titleList);
    console.log('titleList is cleared:', titleList);

    /* for each article */
    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    console.log('list of articles:', articles);
    console.log('customSelector:', customSelector);
    console.log('opts.articleSelector + customSelector:', opts.articleSelector + customSelector);

    let html = '';

    /* get the article id */
    for (let article of articles) {

        let articleId = article.getAttribute('id');
        console.log('articleId: ', articleId);

        /* find the title element */
        let articleTitleElement = article.querySelector(opts.titleSelector);

        /* get the title from the title element */
        let articleTitle = articleTitleElement.innerHTML;
        console.log('articleTitle: ', articleTitle);

        /* create HTML of the link */
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        console.log('linkHTML: ', linkHTML);

        /* insert link into html variable */
        html = html + linkHTML;
        console.log('linkHTML  with variable: ', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links are: ' + links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function clearElement(element) {
    element.innerHTML = '';
}

function calculateTagsParams(tags) {
    console.log('Function \'calculateTagsParams\' is called');
    const params = {
        max: 0,
        min: 999999
    };
    for (let tag in tags) {
        console.log(tag + ' is used ' + tags[tag] + ' times');
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.max);
    }
    return params;
}

function calculateTagClass(count, params) {
    console.log('Function \'calculateTagClass\' is called with parameters:  count = ' + count + ' params= ' + params.min + ', ' + params.max);
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    let classType = Math.floor(percentage * (optsClass.tagSizes.count - 1) + 1);
    console.log('classType', classType);
    return classType;
}

function generateTags() {
    console.log('Function \'generateTags\' is called');

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);
    console.log('all articles', articles);


    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find tags wrapper */
        const tagsWrapper = article.querySelector(opts.articleTagsSelector);
        console.log('tagsWrapper', tagsWrapper);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        let tags = article.getAttribute('data-tags');
        console.log('tags', tags);

        /* split tags into array */
        const tagNames = tags.split(' ');
        console.log('tagNames: ', tagNames);

        /* START LOOP: for each tag */
        for (let tag of tagNames) {
            console.log('tag: ', tag);

            /* generate HTML of the link */
            const linkHTMLData = {id: tag, title: tag};
            const linkHTML = templates.tagLink(linkHTMLData);
            console.log(linkHTML);

            /* add generated code to html variable */
            html += linkHTML;
            console.log('added new link', html);

            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags.hasOwnProperty(tag)) {
                /* [NEW] add generated code to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }

            /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
        console.log('structure of ul links', tagsWrapper);
        /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);

    const tagParams = calculateTagsParams(allTags);
    console.log('tagParams', tagParams);

    /* [NEW] create variable for all links HTML caode */
    const allTagsData = {tags: []};

    /* [NEW] start loop: for each tag in allTags  */
    for (let tag in allTags) {
        console.log(' allTags[tag]', tag);
        console.log(' tagParams', tagParams);

        /* [NEW] generate code of a link and add it to allTagsHMTL  */
        let classSize = calculateTagClass(allTags[tag], tagParams);
        console.log('classSize', classSize);
        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagParams)
        });
        /* [NEW] end loop: for each tag in allTags  */
    }
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData', allTagsData);
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag', tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTags', activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

        /* remove class active */
        activeTag.classList.remove('active');

        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log('tagLinks equal to the href of clickedElement', tagLinks);

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

        /* add class active */
        tagLink.classList.add('active');
        console.log('class active added to tagLink', tagLink);

        /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as an argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log('allLinksToTags', allLinksToTags);

    /* START LOOP: for each link */
    for (let link of allLinksToTags) {
        /* add tagClickHandler as an event listener for that link */
        link.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function generateAuthors() {
    console.log('Function \'generateAuthors\' is called');

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);
    console.log('all articles', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find author wrapper */
        const authorsWrapper = article.querySelector(opts.articleAuthorSelector);
        console.log('authorsWrapper', authorsWrapper);

        /* make html variable with empty string */
        let html = '';

        /* get author from data-author attribute */
        let author = article.getAttribute('data-author');
        console.log('author', author);

        /* generate HTML of the link */
        const linkHTMLData = {id: author, title: author};
        const linkHTML = templates.authorLink(linkHTMLData);
        //   const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
        console.log(linkHTML);

        /* [NEW] check if this link is NOT already in allTags */
        if (!allAuthors.hasOwnProperty(author)) {

            /* [NEW] add generated code to allTags object */
            allAuthors[author] = 1;
        } else {
            allAuthors[author]++;
        }
        console.log('allAuthors', allAuthors);

        /* add generated code to html variable */
        html += linkHTML;
        console.log('added new link', html);

        /* insert HTML of all the links into the tags wrapper */
        authorsWrapper.innerHTML = html;
        console.log('structure of links', authorsWrapper);
    }

    /* [NEW] find list of auhors in right column */
    const authorList = document.querySelector(opts.authorsListSelector);
    console.log('authorList', authorList);

    const authorsParams = calculateTagsParams(allAuthors);
    console.log('authorsParams', authorsParams);

    /* [NEW] create variable for all links HTML caode */
    const allAuthorsData = {authors: []};

    /* [NEW] start loop: for each tag in allTags  */
    for (let author in allAuthors) {
        console.log('allAuthors[author]', author);

        /* [NEW] generate code of a link and add it to allTagsHMTL  */
        let classSize = calculateTagClass(allAuthors[author], authorsParams);
        console.log('classSize', classSize);
        allAuthorsData.authors.push({
            tag: author,
            count: allAuthors[author],
            className: calculateTagClass(allAuthors[author], authorsParams)
        });

        /*    [NEW] end loop: for each tag in allTags  */
    }

    /* [NEW] add html from allAuthorsData to authorList */
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);
}

generateAuthors();

function addClickListenersToAuthors() {
    /* find all links to tags */
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
    console.log('allLinksToAuthors', allLinksToAuthors);

    /* START LOOP: for each link */
    for (let author of allLinksToAuthors) {
        /* add tagClickHandler as an event listener for that link */
        author.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }
}

function authorClickHandler(event) {
    console.log('Function \'authorClickHandler\' is called');
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author', author);

    /* find all tag links with class active */
    const activeAuthor = document.querySelector('a.active[href^="#author-"]');
    console.log('activeAuthor', activeAuthor);
    if (activeAuthor != null) {
        /* remove class active */
        activeAuthor.classList.remove('active');
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log('authorLink equal to the href of clickedElement', authorLinks);

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {

        /* add class active */
        authorLink.classList.add('active');
        console.log('class active added to authorLink', authorLink);

        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with author selector as an argument */
    generateTitleLinks('[data-author="' + author + '"]');
}

addClickListenersToAuthors();
