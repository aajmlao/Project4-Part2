package com.game.wof.wofgame.DAO;

import com.game.wof.wofgame.entity.GameRecord;
import com.game.wof.wofgame.entity.UserRecord;
import com.game.wof.wofgame.entity.Phrase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class GameRecordController{
    private final GameRecordRepository gameRecordRepository;
    private final UserRecordRepository userRecordRepository;
    private final PhraseRepository phraseRepository;

    /**
     * Constructor
     * @param gameRecordRepository
     * @param userRecordRepository
     */
    @Autowired
    public GameRecordController(GameRecordRepository gameRecordRepository,UserRecordRepository userRecordRepository, PhraseRepository phraseRepository){
        this.userRecordRepository = userRecordRepository;
        this.gameRecordRepository = gameRecordRepository;
        this.phraseRepository = phraseRepository;
    }

    /**
     * endpoint for saving game record
     * @param gameRecord
     * @return
     */
    @PostMapping("/saveGameRecord")
    @CrossOrigin(origins = "*")
    public String saveGameRecord(@RequestBody GameRecord gameRecord){
        if (gameRecord == null){
            return "gameRecord is null";
        }
        this.gameRecordRepository.save(gameRecord);
        return "success";
    }

    /**
     * endpoint for saving user record
     * @param userRecord
     * @return
     */
    @PostMapping("/saveUserRecord")
    @CrossOrigin(origins = "*")
    public String saveUserRecord(@RequestBody UserRecord userRecord){
        if (userRecord == null){
            return "gameRecord is null";
        }
        this.userRecordRepository.save(userRecord);
        return "success";
    }

    /**
     * fetch all user Record
     * @return
     */
    @GetMapping("/findAllUserRecord")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<UserRecord> findAllUserRecord() {
        Iterable<UserRecord> userRecords = this.userRecordRepository.findAll();
        List<UserRecord> userRecordsList = new ArrayList<>();
        userRecords.forEach(userRecordsList::add);
        return userRecordsList;
    }

    /**
     * fetch all game record
     * @return
     */
    @GetMapping("/findAllGameRecord")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<GameRecord> findAllGameRecord() {
        Iterable<GameRecord> gameRecords = this.gameRecordRepository.findAll(Sort.by("score").descending());
        List<GameRecord> gameRecordList = new ArrayList<>();
        gameRecords.forEach(gameRecordList::add);
        return gameRecordList;
    }

    /**
     * fetch by userId from game record
     * @param userId
     * @return
     */
    @GetMapping("/findByGRUserId")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<GameRecord> findByGRUserId(@RequestParam String userId) {
        Iterable<GameRecord> gameRecords = this.gameRecordRepository.findByUserId(userId);
        List<GameRecord> gameRecordList = new ArrayList<>();
        gameRecords.forEach(gameRecordList::add);
        return gameRecordList;
    }

    /**
     *fetch by userId from user record
     * @param userId
     * @return
     */
    @GetMapping("/findByURUserId")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<UserRecord> findByURUserId(@RequestParam String userId) {
        Iterable<UserRecord> userRecords = this.userRecordRepository.findByUserId(userId);
        List<UserRecord> userRecordsList = new ArrayList<>();
        userRecords.forEach(userRecordsList::add);
        return userRecordsList;
    }

    /**
     * update the handle name by userId
     * @param userId
     * @param newHandle
     * @return
     */
    @PutMapping("/updateHandle")
    @CrossOrigin(origins = "*")
    public String updateByHandle(@RequestParam String userId, @RequestParam String newHandle){
        List<UserRecord> records = userRecordRepository.findByUserId(userId);
        if (records.isEmpty()){
            return "User Id is not found: "+ userId;
        }
        for(UserRecord record:records){
            record.setHandle(newHandle);
        }
        userRecordRepository.saveAll(records);
        return "user name is updated.";
    }

    /**
     * delete all record by userId
     * @param userId
     */
    @DeleteMapping("/deleteByUserId")
    @CrossOrigin(origins = "*")
    public void deleteByUserId(@RequestParam String userId) {
        gameRecordRepository.deleteByUserId(userId);
    }

    @GetMapping("/findAllPhrase")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<Phrase> findAllPhrase() {
        Iterable<Phrase> phrases = this.phraseRepository.findAll();
        List<Phrase> phrasesList = new ArrayList<>();
        phrases.forEach(phrasesList::add);
        return phrasesList;
    }
}
