package com.game.wof.wofgame.DAO;

import com.game.wof.wofgame.entity.Phrase;
import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface PhraseRepository extends DatastoreRepository<Phrase, Long> {
    
    public List<Phrase> findByDifficulty(String difficulty);

}

