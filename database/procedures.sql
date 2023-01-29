create or replace procedure add_token(in token varchar(32))
begin
    if (select count(*) from signup_tokens st where st.token = token) > 0 then
        select false as result;
    else
        insert into signup_tokens(token) value (token);
        select true as result;
    end if;
end;

create or replace procedure add_user(in username varchar(32), in phc tinytext, in token varchar(32))
begin
    set @token_id = get_token_id(token);
    if token is not null and ((select count(*) from signup_tokens st where st.token = token) <> 1
        or (select count(*) from users u where u.token_id = @token_id) > 0) then
        select false as result, "token" as reason;
    elseif (select count(*) from users u where u.username = username) > 0 then
        select false as result, "duplicate" as reason;
    else
        insert into users (username, phc, token_id) value (username, phc, @token_id);
        select true as result;
    end if;
end;

create or replace procedure add_board(in title varchar(32), in owner varchar(32), in path varchar(32), in public bool)
begin
    if (select count(*) from boards b where b.path = path) > 0 then
        select false as result;
    else
        insert into boards (title, owner_id, path, public) value (title, get_user_id(owner), path, public);
        select true as result;
    end if;
end;

create or replace procedure add_user_to_board(in username varchar(32), in path varchar(32), in access_lvl tinyint)
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if (select count(*) from boards_to_users b2u where b2u.user_id = @user_id and b2u.board_id = @board_id) > 0 then
        select false as result;
    else
        insert into boards_to_users (board_id, user_id, access_lvl) value (@board_id, @user_id, access_lvl);
        select true as result;
    end if;
end;

create or replace procedure add_quote(in quote json, in path varchar(32), in username varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if (select count(*) from boards b where b.id = @board_id) <> 1 or
       (select count(*) from users u where u.id = @user_id) <> 1 or
       has_user_got_access_lvl(username, path, 1) = 0
    then
        select false as result;
    else
        insert into quotes(quote, board_id, user_id) value (quote, @board_id, @user_id);
        select true as result;
    end if;
end;

/* getters */

create or replace procedure get_own_boards(in username varchar(32))
begin
    select b.path, b.title
    from boards b
    where b.owner_id = get_user_id(username);
end;

create or replace procedure get_public_boards(in username varchar(32))
begin
    select b.path, b.title, u.username as owner
    from boards b
             join users u on b.owner_id = u.id
    where b.public = 1;
end;

create or replace procedure get_subscribed_boards(in username varchar(32))
begin
    select b.path, b.title, u.username as owner, b2u.access_lvl
    from boards_to_users b2u
             join boards b on
        b2u.board_id = b.id
             join users u on b.owner_id = u.id
        and b2u.user_id = get_user_id(username);
end;

create or replace procedure get_quotes(
    in fetch_start bigint unsigned,
    in fetch_number bigint unsigned,
    in path varchar(32),
    in username varchar(32)
)
begin
    set @board_id = get_board_id(path);
    if (@board_id is null or has_user_got_access_lvl(username, path, 0) = 0) then
        select false as result;
    else
        select true as result,
               q.quote,
               u.username,
               q.created
        from quotes q
                 join users u on q.user_id = u.id
        where q.board_id = @board_id
        limit fetch_start, fetch_number;
    end if;
end;

create or replace procedure get_phc_from_username(in username varchar(25))
begin
    select phc
    from users u
    where u.username = username;
end;

/* executors */