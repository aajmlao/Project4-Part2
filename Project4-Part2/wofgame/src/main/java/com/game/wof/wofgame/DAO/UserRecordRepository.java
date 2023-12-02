package com.game.wof.wofgame.DAO;

import com.game.wof.wofgame.entity.UserRecord;
import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

import java.util.List;

public interface UserRecordRepository extends DatastoreRepository<UserRecord, Long> {

    //define user record
    List<UserRecord> findByUserId(String userId);

    List<UserRecord> findByHandle(String handle);

    List<UserRecord> deleteByHandle(String handle);
}
