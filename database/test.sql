call add_user("already present", "", null);
call add_user("test 0", "", null);
call add_user("test 1", "", null);
call add_user("test 2", "", null);

call add_board("already present and public", "already present", "apnpub", true);
call add_board("already present and private", "already present", "apnpriv", false);

call add_user_to_board("test 1", "apnpub", 2, "already present");
call add_user_to_board("test 2", "apnpub", 1, "already present");

call add_user_to_board("test 0", "apnpriv", 0, "already present");
call add_user_to_board("test 1", "apnpriv", 1, "already present");
call add_user_to_board("test 2", "apnpriv", 2, "already present");