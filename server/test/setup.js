import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
process.env.NODE_ENV = 'test';
import app from '../src/app';
import {TEST_USERNAME} from '../src/settings';
import {dropTables, createTables, insertIntoTables} from '../src/utils/queryFunctions';


chai.use(sinonChai);
export const { expect } = chai;
export const BASE_URL = '';
export const server = supertest.agent(app);
export const sample_username = TEST_USERNAME;
export const sample_document = {
    "doc": {
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "image",
                        "attrs": {
                            "alt": "Darth Vader",
                            "src": "https://www.lucasfilm.com/app/uploads/marquee-1-34.jpg",
                            "title": "Lucas Film "
                        }
                    }
                ]
            },
            {
                "type": "heading",
                "attrs": {
                    "level": 1
                },
                "content": [
                    {
                        "text": "List of great quotes from The Empire Strikes Back",
                        "type": "text"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "text": "Do you remember the movie ",
                        "type": "text"
                    },
                    {
                        "text": "Star Wars: The Empire Strikes Back ",
                        "type": "text",
                        "marks": [
                            {
                                "type": "em"
                            }
                        ]
                    },
                    {
                        "text": "that screened 40 years ago?",
                        "type": "text"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "text": "Well, Let us relive some of its lines. ",
                        "type": "text"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "text": "More about it ",
                        "type": "text"
                    },
                    {
                        "text": "here",
                        "type": "text",
                        "marks": [
                            {
                                "type": "link",
                                "attrs": {
                                    "href": "https://www.starwars.com/news/40-quotes-star-wars-the-empire-strikes-back",
                                    "title": "Empire at 40"
                                }
                            }
                        ]
                    },
                    {
                        "text": ".",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "selection": {
        "head": 53,
        "type": "text",
        "anchor": 30
    }
  }

export const setupBeforeAfter = () => {
    beforeEach(async function beforeInSuite(){
        await createTables();
    })

    after(async function afterInSuite(){
        await dropTables();
    })
}
  