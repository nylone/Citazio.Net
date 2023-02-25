create or replace view active_users as
    select id, username, phc, created, token_id from users u where u.deleted = false;

create or replace view active_boards as
    select b.id, b.path, b.owner_id, b.title, b.public, b.created,
        (select count(*) from boards_to_users b2u join active_users u on u.id = b2u.user_id where b2u.board_id=b.id) as users,
        (select q.created from quotes q where b.id = q.board_id order by created desc limit 1) as last_updated
    from boards b join active_users u on u.id = b.owner_id where b.deleted = false;