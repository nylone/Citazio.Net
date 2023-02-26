create or replace view active_users as
    select id, username, phc, created, token_id from users u where u.deleted = false;

create or replace view active_boards as
    select b.id, b.path, b.owner_id, b.title, b.public, b.created,
        (select u.username from active_users u where b.owner_id = u.id) as owner,
        (select count(*) from boards_to_users b2u join active_users u on u.id = b2u.user_id where b2u.board_id=b.id) + 1 as users,
        ((select q.updated from quotes q where b.id = q.board_id order by q.updated desc limit 1) or
        (select q.created from quotes q where b.id = q.board_id order by q.created desc limit 1)) as last_updated
    from boards b join active_users u on u.id = b.owner_id where b.deleted = false;