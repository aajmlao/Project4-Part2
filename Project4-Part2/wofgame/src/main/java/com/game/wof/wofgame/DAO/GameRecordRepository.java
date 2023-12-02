package com.game.wof.wofgame.DAO;


import com.game.wof.wofgame.entity.GameRecord;
import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface GameRecordRepository extends DatastoreRepository<GameRecord, Long> {

    //define Game score
    List<GameRecord> findByUserId(String userId);

    List<GameRecord> findByScore(int score);
    @Transactional
    List<GameRecord> deleteByScore(int score);

   void deleteByUserId(String userId);


}

