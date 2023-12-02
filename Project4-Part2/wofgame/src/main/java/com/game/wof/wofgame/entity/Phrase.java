package com.game.wof.wofgame.entity;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "phrases")
public class Phrase {
    @Id
    Long id;

    String phrase;

    public Phrase(String phrase){
        this.phrase = phrase;
    }

    public String getPhrase(){
        return this.phrase;
    }
    
    public void setPhrase(String phrase){
        this.phrase = phrase;
    }

    @Override
    public String toString() {
        return "Phrase{" +
                "id=" + id +
                ", phrase='" + phrase + '\'' +
                '}';
    }
}
