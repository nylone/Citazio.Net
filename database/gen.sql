create or replace table signup_tokens
(
    token_id   bigint unsigned                       not null
        constraint `PRIMARY`
        primary key,
    created_at timestamp default current_timestamp() not null,
    expires_at timestamp                             null
);

create or replace table users
(
    id         bigint unsigned auto_increment
        constraint `PRIMARY`
        primary key,
    username   varchar(25)                           not null,
    phc        tinytext                              not null,
    nickname   varchar(25)                           null,
    created_at timestamp default current_timestamp() not null,
    token_id   bigint unsigned                       null,
    constraint token_id
        unique (token_id),
    constraint username
        unique (username),
    constraint users_ibfk_1
        foreign key (token_id) references signup_tokens (token_id)
);

create or replace procedure add_new_user(IN username varchar(25), IN phc tinytext, IN nickname varchar(25),
                                         IN token_id bigint unsigned)
begin
    insert into users (username, phc, nickname, token_id) value (username, phc, nickname, token_id);
end;

create or replace procedure get_phc_from_username(IN username varchar(25))
begin
    select phc from users u where u.username = username ;
end;

create or replace procedure get_user_from_id(IN id bigint unsigned)
begin
    select * from users u where u.id = id ;
end;

create or replace procedure get_user_from_username(IN username varchar(25))
begin
    select * from users u where u.username = username ;
end;