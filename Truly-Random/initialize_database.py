
"""

This file is not being used (as of now)!
"""


from app import db, Choice

db.drop_all()
db.create_all()

# Operations
Op1 = Choice(name='Coin Toss', details='Simulate a True Random Coin Toss')
Op2 = Choice(name='Integer', details='Generate a Random Integer between two given numbers')
Op3 = Choice(name='Float', details='Generate a Random Float between two given numbers')
Op4 = Choice(name='N Digit Int', details='Generate a Random N Digit Integer')
Op5 = Choice(name='Fraction', details='Generate a Random Float between 0 and 1')
Op6 = Choice(name='N Digit Binary', details='Generate an N Digit Binary Number')
Operations = [Op1, Op2, Op3, Op4, Op5, Op6]

for operation in Operations:
    db.session.add( operation )

db.session.commit()