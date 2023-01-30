create table signup_tokens
(
    id      serial                                not null primary key,
    token   varchar(32)                           not null unique key,
    created timestamp default current_timestamp() not null
);

create table users
(
    id       serial                                not null primary key,
    username varchar(32)                           not null unique key,
    phc      tinytext                              not null,
    created  timestamp default current_timestamp() not null,
    token_id bigint unsigned unique references signup_tokens (id)
);

create table boards
(
    id       serial          not null primary key,
    path     varchar(32)     not null unique key,
    owner_id bigint unsigned not null references users (id),
    title    varchar(32)     not null,
    public   bool            not null default 0,
    created  timestamp                default current_timestamp() not null
);

create table boards_to_users
(
    id         serial                                not null primary key,
    board_id   bigint unsigned                       not null references boards (id),
    user_id    bigint unsigned                       not null references users (id),
    access_lvl tinyint   default 0                   not null,
    created    timestamp default current_timestamp() not null,
    constraint unique (board_id, user_id)
);

create table quotes
(
    id       serial                                not null primary key,
    board_id bigint unsigned                       not null references boards (id),
    user_id  bigint unsigned                       not null references users (id),
    quote    json                                  not null,
    created  timestamp default current_timestamp() not null
);