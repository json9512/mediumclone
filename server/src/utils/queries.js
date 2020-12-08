export const createPostTable = `
DROP TABLE IF EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    document jsonb,
    comments jsonb,
    likes INTEGER,
    image VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`

export const createTimeStampFunction = `
    CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `

export const createTimeStampTrigger = `
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
`

export const insertPosts = `
    INSERT INTO posts(username, document, comments, likes, image)
    VALUES ('StormTrooper', '{
        "doc": {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "QUIZ: NAME THE IMAGE FROM ",
                            "type": "text"
                        },
                        {
                            "text": "THE MANDALORIAN",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "em"
                                }
                            ]
                        },
                        {
                            "text": "?",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Try to guess the character names from The Mandalorian. ",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Here is the ",
                            "type": "text"
                        },
                        {
                            "text": "link",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "href": "https://www.starwars.com/news/quiz-can-you-guess-the-image-from-the-mandalorian",
                                        "title": "The original post"
                                    }
                                }
                            ]
                        },
                        {
                            "text": " ",
                            "type": "text"
                        }
                    ]
                }
            ]
        },
        "selection": {
            "head": 119,
            "type": "text",
            "anchor": 119
        }
    }', '{}', '3', '/images/profile/storm.png'),
    ('theChild', '{
        "doc": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "image",
                            "attrs": {
                                "alt": "Mando",
                                "src": "https://cdn.mos.cms.futurecdn.net/SRxSp8y2pSBjCRXo5jiWrG.jpg",
                                "title": "The Mandalorian"
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
                            "text": "Mando joins Fortnite",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can play as Mando with the Child by your side. ",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Check more about it ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "href": "https://www.starwars.com/news/the-mandalorian-joins-fortnite",
                                        "title": "Mando joins FORTNITE"
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
            "head": 104,
            "type": "text",
            "anchor": 104
        }
    }', '{}', 66, '/images/profile/yoda.png'),
    ('iamMando', '{
        "doc": {
            "type": "doc",
            "content": [
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "Do you like books? Check this out !",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Megan Crouse recommends these books for you to dive deeper into the world of Star Wars. ",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Read more about it ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "href": "https://www.starwars.com/news/4-star-wars-books-to-read-after-finishing-squadrons",
                                        "title": "Four books to read after finishing Squadron"
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
            "head": 152,
            "type": "text",
            "anchor": 152
        }
    }', '{}', 0, '/images/profile/mando.png'),
    ('iamMando', '{
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
    }', '{}', 16, '/images/profile/mando.png')
`

export const dropPostsTable = `DROP TABLE posts;`;
