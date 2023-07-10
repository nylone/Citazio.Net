create or replace view active_users as
    select id, username, phc, created, token_id from users u where u.deleted is null;

create or replace view active_quotes as
    select id, board_id, user_id, quote, created, updated from quotes q where q.deleted is null;

create or replace view active_boards as
    select b.id, b.path, b.owner_id, b.title, b.public, b.created, u.username as owner,
        (select count(*) from boards_to_users b2u join active_users u on u.id = b2u.user_id where b2u.board_id=b.id) + 1 as users,
        (select if((select q.updated from quotes q where b.id = q.board_id order by q.updated desc limit 1) is not null,
            (select q.updated from quotes q where b.id = q.board_id order by q.updated desc limit 1),
            (select q.created from quotes q where b.id = q.board_id order by q.created desc limit 1))) as last_updated
    from boards b join active_users u on u.id = b.owner_id
    where b.deleted is null;