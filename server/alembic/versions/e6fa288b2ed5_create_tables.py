"""create_tables

Revision ID: e6fa288b2ed5
Revises:
Create Date: 2018-09-20 13:17:17.159458

"""
from alembic import op
from sqlalchemy import (
    Column, ForeignKey, Integer, String, Text, DateTime
)


# revision identifiers, used by Alembic.
revision = 'e6fa288b2ed5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'role',
        Column('id', Integer, primary_key=True),
        Column('name', String(255), nullable=False)
    )
    op.execute('''
        INSERT INTO "role" (name) VALUES ('Admin'), ('User');
    ''')

    op.create_table(
        'user',
        Column('id', Integer, primary_key=True),
        Column('name', String(255), nullable=False),
        Column('role_id', Integer, ForeignKey('role.id'), nullable=False)
    )

    op.create_table(
        'news',
        Column('id', Integer, primary_key=True),
        Column('author_id', Integer, ForeignKey('user.id'), nullable=False),
        Column('time', DateTime(timezone=True), nullable=False),
        Column('text', Text)
    )

    op.create_table(
        'alt_id_type',
        Column('id', Integer, primary_key=True),
        Column('name', String(255), nullable=False),
    )
    op.execute('''
        INSERT INTO "alt_id_type" (name)
        VALUES ('crsid');
    ''')

    op.create_table(
        'alt_id_user',
        Column('user_id', Integer, ForeignKey('user.id'), nullable=False),
        Column('alt_id_type_id', Integer,
               ForeignKey('alt_id_type.id'), nullable=False),
        Column('value', String(255), nullable=False)
    )
    op.create_primary_key(
        'pk_alt_id_user', 'alt_id_user',
        ['user_id', 'alt_id_type_id']
    )

    op.create_table(
        'picture',
        Column('id', Integer, primary_key=True),
        Column('readable_name', String(255)),
        Column('path', String(255), nullable=False),
    )

    op.create_table(
        'committee',
        Column('id', Integer, primary_key=True),
        Column('position', String(255), nullable=False),
        Column('email', String(255), nullable=False),
        Column('sorting_priority', Integer),
        Column('user_id', Integer, ForeignKey('user.id'), nullable=False),
        Column('picture_id', Integer, ForeignKey('picture.id'))
    )


def downgrade():
    op.drop_table('committee')
    op.drop_table('picture')
    op.drop_table('alt_id_user')
    op.drop_table('alt_id_type')
    op.drop_table('news')
    op.drop_table('user')
    op.drop_table('role')
