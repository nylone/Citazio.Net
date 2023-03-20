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
        or (select count(*) from users u where u.token_id = @token_id) > 0)
        or (select count(*) from users u where u.username = username) > 0 then
        select false as result;
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

create or replace procedure add_user_to_board(in username varchar(32), in path varchar(32), in access_lvl tinyint,
                                              in executor varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if (@user_id is null or
        @board_id is null or
        username = executor or
        is_board_owner(username, path) or
        has_user_got_access_lvl(executor, path, if(access_lvl >= 2, 3, 2)) = 0 or
        (select count(*) from boards_to_users b2u where b2u.user_id = @user_id and b2u.board_id = @board_id) > 0) then
        select false as result;
    else
        insert into boards_to_users (board_id, user_id, access_lvl) value (@board_id, @user_id, access_lvl);
        select true as result;
    end if;
end;

create or replace procedure remove_user_from_board(in username varchar(32), in path varchar(32),
                                                   in executor varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if (@user_id is null or
        @board_id is null or
        username = executor or
        (select count(*) from boards_to_users b2u where b2u.user_id = @user_id and b2u.board_id = @board_id) = 0) or
       has_user_got_access_lvl(executor, path, if(
                   (select access_lvl
                    from boards_to_users b2u
                    where b2u.user_id = @user_id
                      and b2u.board_id = @board_id) >= 2, 3, 2)) = 0
    then
        select false as result;
    else
        delete from boards_to_users where board_id = @board_id and user_id = @user_id;
        select true as result;
    end if;
end;

create or replace procedure edit_user_on_board(in username varchar(32), in path varchar(32), in access_lvl tinyint,
                                               in executor varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if (@user_id is null or
        @board_id is null or
        username = executor or
        (select count(*) from boards_to_users b2u where b2u.user_id = @user_id and b2u.board_id = @board_id) = 0) or
       has_user_got_access_lvl(executor, path, if(
                   (select access_lvl
                    from boards_to_users b2u
                    where b2u.user_id = @user_id
                      and b2u.board_id = @board_id) >= 2, 3, 2)) = 0
    then
        select false as result;
    else
        update boards_to_users b2u set b2u.access_lvl = access_lvl where board_id = @board_id and user_id = @user_id;
        select true as result;
    end if;
end;

create or replace procedure add_quote(in quote json, in path varchar(32), in username varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if @board_id is null or @user_id is null or
       has_user_got_access_lvl(username, path, 1) = 0
    then
        select false as result;
    else
        insert into quotes(quote, board_id, user_id) value (quote, @board_id, @user_id);
        select true as result;
    end if;
end;

create or replace procedure remove_quote(in id bigint unsigned, in path varchar(32), in username varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if @board_id is null or @user_id is null or
       (select count(*) from active_quotes q where q.id = id) <> 1 or
       has_user_got_access_lvl(username, path,
                               if((select q.user_id from quotes q where q.id = id) = @user_id, 1, 2)) = 0
    then
        select false as result;
    else
        update quotes q set q.deleted = current_timestamp() where q.id = id;
        select true as result;
    end if;
end;

create or replace procedure edit_quote(in id bigint unsigned, in quote json, in path varchar(32),
                                       in username varchar(32))
begin
    set @user_id = get_user_id(username);
    set @board_id = get_board_id(path);
    if @board_id is null or @user_id is null or
       (select count(*) from active_quotes q where q.id = id) <> 1 or
       if((select q.user_id from quotes q where q.id = id) = @user_id, 1, 0) = 0
    then
        select false as result;
    else
        update quotes q set q.quote = quote, q.updated = current_timestamp() where q.board_id = @board_id and q.user_id = @user_id;
        select true as result;
    end if;
end;

create or replace procedure get_own_boards(in username varchar(32))
begin
    select b.path, b.title, b.users, b.last_updated
    from active_boards b
    where b.owner_id = get_user_id(username);
end;

create or replace procedure get_public_boards()
begin
    select b.path, b.title, b.owner, b.last_updated
    from active_boards b
    where b.public = 1;
end;

create or replace procedure get_subscribed_boards(in username varchar(32))
begin
    select b.path, b.title, b.owner, b2u.access_lvl, b.users, b.last_updated
    from boards_to_users b2u
             join active_boards b on
        b2u.board_id = b.id
        and b2u.user_id = get_user_id(username);
end;

create or replace procedure get_board_quotes(
    in path varchar(32),
    in username varchar(32)
)
begin
    set @board_id = get_board_id(path);
    if (@board_id is null or has_user_got_access_lvl(username, path, 0) = 0) then
        select false as result;
    else
        select q.id,
               q.quote,
               u.username,
               q.created
        from active_quotes q
                 join users u on q.user_id = u.id
        where q.board_id = @board_id;
    end if;
end;

create or replace procedure get_board_users(
    in path varchar(32),
    in username varchar(32)
)
begin
    set @board_id = get_board_id(path);
    if (@board_id is null or has_user_got_access_lvl(username, path, 2) = 0) then
        select false as result;
    else
        select u.username,
               b2u.access_lvl
        from boards_to_users b2u
                 join active_users u on b2u.user_id = u.id
        where b2u.board_id = @board_id;
    end if;
end;

create or replace procedure get_phc_from_username(in username varchar(25))
begin
    select phc
    from active_users u
    where u.username = username;
end;

create or replace procedure edit_board(in path varchar(32), in title varchar(32), in public bool,
                                       in executor varchar(32))
begin
    set @board_id = get_board_id(path);
    set @executor_id = get_user_id(executor);
    if (@board_id is null or
        @executor_id is null or
        ((select owner_id from active_boards b where b.id = @board_id) <> @executor_id))
    then
        select false as result;
    else
        if title is not null then
            update boards b set b.title = title where id = @board_id;
        end if;
        if public is not null then
            update boards b set b.public = public where id = @board_id;
        end if;
        select true as result;
    end if;
end;

create or replace procedure edit_board_owner(in path varchar(32), in new_owner varchar(32), in executor varchar(32))
begin
    set @board_id = get_board_id(path);
    set @executor_id = get_user_id(executor);
    set @new_owner_id = get_user_id(new_owner);
    if (@board_id is null or
        @executor_id is null or
        @new_owner_id is null or
        ((select owner_id from active_boards b where b.id = @board_id) <> @executor_id))
    then
        select false as result;
    else
        call remove_user_from_board(new_owner, path, executor);
        update boards b set b.owner_id = @new_owner_id where id = @board_id;
        select true as result;
    end if;
end;

create or replace procedure remove_board(in path varchar(32), in executor varchar(32))
begin
    set @board_id = get_board_id(path);
    set @executor_id = get_user_id(executor);
    if (@board_id is null or
        @executor_id is null or
        ((select owner_id from active_boards b where b.id = @board_id) <> @executor_id))
    then
        select false as result;
    else
        update boards b set b.deleted = current_timestamp() where id = @board_id;
        select true as result;
    end if;
end;

create or replace procedure remove_user(in username varchar(32))
begin
    set @user_id = get_user_id(username);
    if (@user_id is null or
        ((select count(*) from active_boards b where b.owner_id = @user_id) <> 0))
    then
        select false as result;
    else
        update users u set u.deleted = current_timestamp() where u.id = @user_id;
        select true as result;
    end if;
end;

create or replace procedure edit_user_phc(in username varchar(32), in phc tinytext)
begin
    set @user_id = get_user_id(username);
    if (@user_id is null or phc is null)
    then
        select false as result;
    else
        update users u set u.phc = phc where u.id = @user_id;
        select true as result;
    end if;
end;