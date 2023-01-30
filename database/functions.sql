create or replace function get_user_id(username varchar(32)) returns bigint unsigned
    reads sql data
begin
    return (select u.id from users u where u.username = username);
end;

create or replace function get_board_id(path varchar(32)) returns bigint unsigned
    reads sql data
begin
    return (select b.id from boards b where b.path = path);
end;

create or replace function get_token_id(token varchar(32)) returns bigint unsigned
    reads sql data
begin
    return (select st.id from signup_tokens st where st.token = token);
end;

create or replace function has_user_got_access_lvl(username varchar(32), path varchar(32), required_lvl tinyint)
    returns bool
    reads sql data
begin
    set @haugal_user_id = get_user_id(username);
    set @haugal_board_id = get_board_id(path);
    if (select owner_id from boards b where b.id = @haugal_board_id limit 1) = @haugal_user_id then return true;
    elseif (select access_lvl from boards_to_users b2u
                              where b2u.board_id = @haugal_board_id and b2u.user_id = @haugal_user_id
           limit 1) >= required_lvl
    then return true;
    elseif (select public from boards b where b.id = @haugal_board_id) = 1 and required_lvl = 0 then return true;
    else return false;
    end if;
end;

create or replace function is_board_owner(username varchar(32), path varchar(32)) returns bool reads sql data
begin
    return if((select owner_id from boards b where b.path = path) = get_user_id(username), true, false);
end;