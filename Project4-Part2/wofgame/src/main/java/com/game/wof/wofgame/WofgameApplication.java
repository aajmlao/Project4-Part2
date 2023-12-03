package com.game.wof.wofgame;


import com.game.wof.wofgame.DAO.GameRecordRepository;
import com.game.wof.wofgame.DAO.UserRecordRepository;
import com.game.wof.wofgame.entity.GameRecord;
import com.game.wof.wofgame.entity.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import com.google.common.collect.Lists;

import java.util.List;

@ShellComponent
@SpringBootApplication
public class WofgameApplication {
	/**
	 * data members
	 */
	@Autowired
	GameRecordRepository gameRecordRepository;
	UserRecordRepository userRecordRepository;


	public static void main(String[] args) {
		SpringApplication.run(WofgameApplication.class, args);
	}

	/**
	 *save to user record
	 * @param userId
	 * @param handle
	 * @return
	 */
	@ShellMethod("Save a user record to cloud Datastore: save-userRecord <userId> <handle>")
	public String saveUserRecord(String userId, String handle){
		UserRecord saveUserRecord = this.userRecordRepository.save(new UserRecord(userId, handle));
		return saveUserRecord.toString();
	}

	/**
	 * save to game record
	 * @param userId
	 * @param score
	 * @param date
	 * @return
	 */
	@ShellMethod("Save a game record to cloud Datastore: save-gameRecord <userId> <score> <date>")
	public String saveGameRecord(String userId, int score, String date){
		GameRecord saveGameRecord = this.gameRecordRepository.save(new GameRecord(userId, score, date));
		return saveGameRecord.toString();
	}

	/**
	 * find by all gameRecord
	 * @return
	 */
	@ShellMethod("Find All Users in gameRecord")
	public String findAllUserIdGR(){
		Iterable<GameRecord> gameRecords = this.gameRecordRepository.findAll();
		return Lists.newArrayList(gameRecords).toString();
	}

	/**
	 * find by all userRecord
	 * @return
	 */
	@ShellMethod("Find All Users in userRecord")
	public String findAllUserIdUR(){
		Iterable<UserRecord> userRecords = this.userRecordRepository.findAll();
		return Lists.newArrayList(userRecords).toString();
	}

	/**
	 * find by score
	 * @param score
	 * @return
	 */
	@ShellMethod("Find record by score: find-by-score <score>")
	public String findByScore(int score){
		List<GameRecord> gameRecords = this.gameRecordRepository.findByScore(score);
		return gameRecords.toString();
	}

	/**
	 * find by handle name
	 * @param handle
	 * @return
	 */
	@ShellMethod("Find record by handle: find-by-handle <handle>")
	public String findByHandle(String handle){
		List<UserRecord> userRecords = this.userRecordRepository.findByHandle(handle);
		return userRecords.toString();
	}

	/**
	 * find by userId in game
	 * @param userId
	 * @return
	 */
	@ShellMethod("Find record by userId in gameRecord: find-by-userIdGR <userId>")
	public String findByUserIdGame(String userId){
		List<GameRecord> gameRecords = this.gameRecordRepository.findByUserId(userId);
		return gameRecords.toString();
	}

	/**
	 * find by userId in user
	 * @param userId
	 * @return
	 */
	@ShellMethod("Find record by userId in userRecord: find-by-userIdUR <userId>")
	public String findByUserIdUser(String userId){
		List<UserRecord> userRecords = this.userRecordRepository.findByUserId(userId);
		return userRecords.toString();
	}

	/**
	 * update handle by userId
	 * @param userId
	 * @param newHandle
	 * @return
	 */
	@ShellMethod("Update username: update-handle <userId> <newHandle>")
	public String updateByHandle(String userId, String newHandle){
		List<UserRecord> userRecords = this.userRecordRepository.findByUserId(userId);
		if(userRecords.isEmpty()){
			return "User Id is not found: "+ userId;
		}
		for(UserRecord record: userRecords){
			record.setHandle(newHandle);
		}
		userRecordRepository.saveAll(userRecords);
		return "user name is updated.";
	}

	/**
	 * delete all record by userid
	 * @param userId
	 */
	@ShellMethod("Delete by userId: delete-userId <userId>")
	public void deleteByUserId(String userId){
		gameRecordRepository.deleteByUserId(userId);
	}

	@ShellMethod("Remove all Records")
	public void removeAllRecord(){
		this.gameRecordRepository.deleteAll();
		this.userRecordRepository.deleteAll();
	}

	@ShellMethod("Save a game record to cloud Datastore: save-gameRecord <userId> <score> <date>")
	public String savePhrase(String phrase, String difficulty){
		Phrase savePhrase = this.phraseRepository.save(new Phrase(phrase, difficulty))		return savePhrase.toString();
	}
}
