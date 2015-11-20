---
layout: post
title: "\"Haskell\": 17 Points in Scrabble™"
---

*This has been in my `_drafts` directory for months and now that I re-read it, it seems trivial, but it's time to start good habits and just post things instead of feeling like it's inadequate.*

I've been in the process of learning Haskell for a while now, but only recently have gotten to a point where I feel like I know enough to actually *do* anything with it. While laying in bed, I was thinking of things I could write that would be easy, but not too easy and decided a simple little program to find all the possible word combinations given a set of Scrabble™ tiles would be a good start, and also a good way to demonstrate how concise Haskell code can be.

<!-- fold -->

## The Problem

The problem at hand is a good one for learning, particularly because it involves a problem that nearly everyone has faced while playing Scrabble™ and can easily be reasoned about in your head. 

> Given a set of tiles, find all combinations of valid Scrabble™ words that can be played

We'll ignore the possibility of appending tiles to existing words for now and just focus on finding possibilities from a dictionary. I used this Scrabble™ dictionary CSV from [here](https://github.com/zeisler/scrabble/blob/master/db/dictionary.csv.gz). My first thought for how to get the job done was to make a list of possible letter combinations from the set we have, then, find the words that are common to both our list, and the dictionary. Pretty simple in our heads, but a bit of a messy process in languages like Javascript:

{% highlight js linenos %}
function permute(x){
  
  x = x.split('');

  var stack = [];
  var permutations = [];

  function doPermutation(){
    if(x.length === 0){
      permutations.push(stack.slice().join(''));
    }
    for(var i = 0; i < x.length; i++){
      var tmp = x.splice(i, 1);
      stack.push(tmp);
      doPermutation();
      stack.pop();
      x.splice(i, 0, tmp);
    }
  }

  doPermutation();
  return permutations;
}

var letters = "caietsh";
console.log(permute(letters));
{% endhighlight %}

This code isn't the most easily readable, and if you copy it into a file to run with node, you'll be waiting for quite some time before it finishes. What's more, is that this isn't even *all* the word combinations that are possible - it leaves out all the combinations that don't use all of the available letters. While it's very possible that there's a better algorithm for finding permutations of a string, it's likely to be more complex and far less easy to read.

Even after getting this list of possible words, finding the intersection of the list with the Scrabble™ dictionary will be a very expensive process - given 8 letters, there are *13700 possibilities*.

## Enter Haskell

Lists are the bread and butter of Haskell. You use them *everywhere*. As such, the standard library includes lots of functions for working with them, and tasks like what we are dealing with become almost trivial.

{% highlight haskell linenos %}
possibilities :: String -> [String]
possibilities = concat . map permutations . subsequences
{% endhighlight %}

This is the entire function for generating a list of possible combinations, given a string. It is written in what is known as [point-free notation](https://wiki.haskell.org/Pointfree) and with function composition, so if you aren't familiar with Haskell, this version may make more sense:

{% highlight haskell linenos %}
possibilities :: String -> [String]
possibilities letters = concat (map permutations (subsequences letters))
{% endhighlight %}


First, we get a list of `subsequences` of our letter set because we don't necessarily have to use all the letters. Then, we `map` the function `permutations` to the list of subsequences we found, and finally, `concat`enate the resulting list of lists together so we end up with a list of strings. This list is pretty big for letter sets of size 7 or 8, so it can take a while to be computed. It takes even more time to find the intersection of our dictionary unless we sort our dictionary and create a binary search tree (something that I may need to do in the future just for fun). However, at this point, I thought of a much simpler way to find the possible words and started from the beginning.

## Take Two

Instead of computing a list of *all* possible letter combinations, why not just go through the dictionary to see what is possible, *and a real word* . It's a fairly obvious thing to do looking back, but when I first was thinking about this, it just never occured to me. So what is required to make it happen?

1. Iterate through the dictionary
2. Check if each dictionary word can be made using our letters
3. Throw away the words we can't make

Simple right? Now before you look below here at the Haskell code, just imagine what this would look like written in Javascript, or Python, or Ruby. More than 30 lines, right? Here's the complete Haskell code, inluding reading and parsing the Scrabble™ dictionary csv, and adding the possible scores for the returned words:

{% highlight haskell linenos %}
import Data.List
import Data.Maybe
import qualified Data.Map as M

possibilities :: String -> [String] -> [String]
possibilities letters = filter (possibleWord letters)

possibleWord :: String -> String -> Bool
possibleWord xs [] = True
possibleWord xs (y:ys) = if y `elem` xs
  then possibleWord (delete y xs) ys
  else False

scores :: [String] -> [(String, Int)]
scores = map (\x -> (x, score x))

score :: String -> Int
score = foldr (\tile acc -> acc + tileScore tile) 0
  where tileScore t = fromJust $ M.lookup t tiles


tiles = M.fromList [('a',1),('b',3),('c',3),('d',2)
                        ,('e',1),('f',4),('g',2),('h',4)
                        ,('i',1),('j',8),('k',5),('l',1)
                        ,('m',3),('n',1),('o',1),('p',3)
                        ,('q',10),('r',1),('s',1),('t',1)
                        ,('u',1),('v',4),('w',4),('y',4)
                        ,('x',8),('z',10)]

main = do
  dict <- readFile "./dictionary.csv"
  putStrLn "Input your scrabble letters:"
  tiles <- getLine
  putStrLn $ show 
    . sortBy comparator
    . scores
    . possibilities tiles $ map init $ lines dict
  where comparator a b = if snd a > snd b then LT else GT
{% endhighlight %}

Let's walk through the code line by line.

{% highlight haskell linenos %}
import Data.List
import Data.Maybe
import qualified Data.Map as M
{% endhighlight %}

These are pretty self explanatory. We need some of the functions that are specific to lists in `Data.List`, the `fromJust` function exposed by `Data.Maybe`, and `Data.Map` for a map - namespaced as `M` to avoid naming collisions[^fn-namespaces].

{% highlight haskell linenos %}
possibilities :: String -> [String] -> [String]
possibilities letters = filter (possibleWord letters)

possibleWord :: String -> String -> Bool
possibleWord xs [] = True
possibleWord xs (y:ys) = if y `elem` xs
  then possibleWord (delete y xs) ys
  else False
{% endhighlight %}

Here is the meat of the code, we create the functions that will give us a list of all possible words. First, we'll look at `possibleWord`. This is the check that takes a valid Scrabble™ word, and a list of our letters (`xs`), then checks if the first letter is in the Scrabble™ word[^fn-char_lists]. If it is, it removes that letter from the scrabble word and repeats the process using our remaining letters that haven't been used, and the new word (less the character we just removed). Stepwise, it looks like this:

{% highlight haskell linenos %}
possibleWord "aresyin" "rainy"
-- checks if 'r' is in "aresyin", and succeeds
possibleWord "aesyin" "ainy"
-- checks if 'a' is in "aesyin", and succeeds,
-- continuing this pattern until the end where
possibleWord "es" ""
-- This case will match the first pattern of
-- possibleWord xs [] = True
-- and will return True
{% endhighlight %}

This function is then applied to the list of possible Scrabble™ words in `possibilities`, using `filter`. This works the same as `Array.prototype.filter` in Javascript, and I'm sure most otherlanguates behave in a similar way. What makes this code nicer (in my opinion) is the use of pattern matching and not having to write for loops and explicitly declare temporary variables.

Next, we add the scores:

{% highlight haskell linenos %}
scores :: [String] -> [(String, Int)]
scores = map (\x -> (x, score x))

score :: String -> Int
score = foldr (\tile acc -> acc + tileScore tile) 0
  where tileScore t = fromJust $ M.lookup t tiles


tiles = M.fromList [('a',1),('b',3),('c',3),('d',2)
                        ,('e',1),('f',4),('g',2),('h',4)
                        ,('i',1),('j',8),('k',5),('l',1)
                        ,('m',3),('n',1),('o',1),('p',3)
                        ,('q',10),('r',1),('s',1),('t',1)
                        ,('u',1),('v',4),('w',4),('y',4)
                        ,('x',8),('z',10)]
{% endhighlight %}

We calculate `score` for a word by folding over a word with a lambda expression that will sum the tile values, and apply `score` using `map` to all the possible words we've found above. On line 6, `fromJust` is the function we need to use from `Data.Maybe` and all it does is extract the value from the `Maybe Int` type returned by `M.lookup t tiles`, throwing an error if the specified tile can't be found. When all is said and done, `scores` will be used to create a list of tuples, containing a word and its score.


{% highlight haskell linenos %}
main = do
  dict <- readFile "./dictionary.csv"
  putStrLn "Input your scrabble letters:"
  tiles <- getLine
  putStrLn $ show 
    . sortBy comparator
    . scores
    . possibilities tiles $ map init $ lines dict
  where comparator a b = if snd a > snd b then LT else GT
{% endhighlight %}

Finally, we compose all of our functions together in the `main` function and output what we need. I haven't gone to great lengths to make the output very pretty, but it gets the job done. We first read the file of possible words into a string (it contains a word on every line and nothing else), read in our tiles, then wire our functions together. It helps sometimes to read a long composition in reverse

* take the string of possible words, and split it into lines
* get everything except the last element of each line (we need to ignore the `\\n`)
* apply the possibilities filter to our list of possible words
* calculate the scores for our list of valid words
* sort by scores (the scond value of the tuple)
* output the results
* ...
* profit!

This likely isn't the most efficient way to get the task done, but it was a great way to get a grasp on Haskells most commonly used features: pattern matching, composition (`.`), and `map` and `foldr`. I wouldn't suggest using this in your next game of Scrabble™ though. It *will* run more than fast enough to work in your turn, but nobody likes a cheater.

Code can be found [here](https://github.com/mdtusz/scrabble-cheat).

[^fn-namespaces]: Haskell has a set of default functions loaded as `Prelude`, some of which have names that will conflict with packages loaded in. We can avoid this by making an imported module `qualified`, or specifying which functions to include or exclude using syntax like `import Data.List (nub, sort)` to include `nub` and `sort`, or `import Data.List hiding (nub, sort)` to load everything *except* `nub` and `sort`.
[^fn-char_lists]: Conveniently, `Strings` and `[Char]`'s are treated the same in Haskell.
